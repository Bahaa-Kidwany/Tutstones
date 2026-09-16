const fs = require('fs');

async function run() {
  // 1. Fetch current live data
  const liveRes = await fetch('https://www.tutstones.com/api.php?_=1', { cache: 'no-store' });
  const liveData = await liveRes.json();
  console.log('1. Current live aboutTitle:', liveData.homePage?.aboutTitle);
  console.log('1. Current lastModified:', liveData.lastModified);
  
  // 2. Modify it
  liveData.homePage.aboutTitle = 'TEST_NODEJS_' + Date.now();
  liveData.lastModified = Date.now();
  
  // 3. Push it back
  const postRes = await fetch('https://www.tutstones.com/api.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'tutstones_api_key_2026'
    },
    body: JSON.stringify(liveData)
  });
  const postData = await postRes.json();
  console.log('2. POST response:', postData);
  
  // 4. Fetch it again
  const newLiveRes = await fetch('https://www.tutstones.com/api.php?_=2', { cache: 'no-store' });
  const newLiveData = await newLiveRes.json();
  console.log('3. New live aboutTitle:', newLiveData.homePage?.aboutTitle);
  console.log('3. New lastModified:', newLiveData.lastModified);
}
run();
