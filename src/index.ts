import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import tumblr from 'tumblr.js'; 
import axios from "axios";
//const tumblr = require('tumblr.js');

const TUMBLR_API_BASE = "https://api.tumblr.com";
const USER_AGENT = "tumblr-mcp/1.0";

// Create server instance
const server = new McpServer({
  name: "tumblr-mcp",
  version: "1.0.0",
});

//type declarations
interface TumblrClient {
  blogPosts(
    blogName: string,
    options: { type?: string },
    callback: (err: Error | null, data: any) => void
  ): void;

  userInfo(callback: (err: Error | null, data: any) => void): void;

  createTextPost(
    blogName: string,
    options: { title?: string; body: string },
    callback: (err: Error | null, data: any) => void
  ): void;
}

interface TumblrOptions {
  consumer_key: string;
  consumer_secret: string;
  token?: string;
  token_secret?: string;
}

const client = tumblr.createClient({
  consumer_key: "<token>",
  consumer_secret: "<token>",
  token: "<token>",
  token_secret: "<token>"
});


console.log("📢 Available client functions:", Object.keys(client));

// Tumblr API credentials
const API_KEY = "<token>";
const BLOG_NAME ="<token>";
const OAUTH_TOKEN = "<token>";
const OAUTH_TOKEN_SECRET = "<token>"


async function createPost(title: string, body: string) {
  try {
    const url = `https://api.tumblr.com/v2/blog/${BLOG_NAME}/post`;
    const headers = {
      Authorization: `Bearer ${OAUTH_TOKEN}`,
      "Content-Type": "application/json",
    };

    const data = {
      type: "text",
      title: title,
      body: body,
    };

    const response = await axios.post(url, data, { headers });
    console.log("✅ Post Created:", response.data);
  } catch (error: any) {
    console.error("Error posting to Tumblr:", error.response?.data || error.message);
  }
}

// ✅ Call the function
createPost("Hello, Tumblr!", "This is a TypeScript post without tumblr.js.");


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Tumblr MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });