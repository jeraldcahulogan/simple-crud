import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is a proxy server that Vite provides, which is used to
  // forward requests from the client (browser) to the server.
  // The reason we need this is because the client and server are
  // running on different ports, and the client is making requests
  // to the server on a different port than the one that the server
  // is listening on. This is a common issue when developing
  // full-stack applications, where the client and server are
  // developed separately and run on different ports.
  //
  // The proxy server works by intercepting requests from the client
  // and forwarding them to the server. The server then processes
  // the request and sends the response back to the proxy server,
  // which then forwards the response back to the client.
  //
  // In this case, we are proxying requests from the client to the
  // server on port 5000. This is the port that the server is
  // listening on, and it is the port that the client is making
  // requests to.
  //
  // The "changeOrigin" option is set to true, which means that
  // the proxy server will rewrite the "origin" header of the
  // request to the value of the target URL. This is necessary
  // because the client is making requests to a different origin
  // (the proxy server) than the one that the server is listening
  // on.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
