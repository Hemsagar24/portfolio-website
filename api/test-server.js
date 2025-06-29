// Test script to verify file server functionality
const fetch = require('node-fetch');

async function testFileServer() {
  try {
    console.log('🧪 Testing file server...');
    
    // Test with a simple experiences array
    const testExperiences = [
      {
        id: 1,
        title: "Test Title",
        company: "Test Company",
        location: "Test Location",
        duration: "Test Duration",
        period: "Test Period",
        current: false,
        achievements: ["Test Achievement"],
        technologies: ["Test Tech"],
        color: "from-blue-500 to-purple-600",
        highlight: "Test Highlight"
      }
    ];

    const response = await fetch('http://localhost:3001/api/save-experiences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ experiences: testExperiences }),
    });

    if (response.ok) {
      console.log('✅ File server is working correctly!');
      console.log('📄 Check your Experience.jsx file for the test data');
    } else {
      console.log('❌ File server error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

testFileServer();
