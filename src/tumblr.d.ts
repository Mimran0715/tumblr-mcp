declare module 'tumblr.js' {
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
  
    function createClient(options: TumblrOptions): TumblrClient;
  
    export = { createClient };
  }
  