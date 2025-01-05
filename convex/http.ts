/**
 * Webhook handler for Clerk Authentication service
 * Processes user creation events and syncs new users to the Convex database
 */

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api, internal } from "./_generated/api";

// Initialize HTTP router for handling webhook requests
const http = httpRouter();

// Define webhook route handler for Clerk authentication events
http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify webhook secret is configured
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    // Extract Svix webhook headers required for verification
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    // Validate all required headers are present
    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occurred -- no svix headers", {
        status: 400,
      });
    }

    // Get the webhook payload
    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Initialize Svix webhook verifier
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    // Verify webhook signature to ensure request authenticity
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    // Handle specific webhook events
    const eventType = evt.type;
    if (eventType === "user.created") {
      // Extract user data from the webhook event
      const { id, email_addresses, first_name, last_name } = evt.data;

      // Format user data for database storage
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      // Sync user data with Convex database
      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    // Return success response if webhook is processed successfully
    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;