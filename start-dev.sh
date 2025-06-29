#!/bin/bash

# Start the file server in the background
echo "🚀 Starting file server on port 3001..."
cd api && npm start &
FILE_SERVER_PID=$!

# Wait a moment for the file server to start
sleep 2

# Start the main dev server
echo "🚀 Starting main dev server..."
cd ..
npm run dev &
DEV_SERVER_PID=$!

echo "✅ Both servers are running!"
echo "📝 Portfolio: http://localhost:5173"
echo "🔧 File Server: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes when script exits
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $FILE_SERVER_PID 2>/dev/null
    kill $DEV_SERVER_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on exit
trap cleanup INT TERM

# Wait for both processes
wait
