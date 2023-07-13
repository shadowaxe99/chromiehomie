```javascript
// Importing necessary schemas and variables
import { UserProfileSchema, ContentDataSchema, EngagementMetricsSchema } from './schemas.js';
import { userProfile, contentData, engagementMetrics } from './sharedVariables.js';

// Function to collect data from user's social media feed
function collectData() {
  // Scroll through user's Instagram or Twitter feed
  chrome.tabs.executeScript({
    code: `
      let posts = document.querySelectorAll('.post, .tweet');
      return Array.from(posts).map(post => {
        return {
          content: post.innerText,
          likes: post.querySelector('.likes').innerText,
          comments: post.querySelector('.comments').innerText,
          retweets: post.querySelector('.retweets').innerText
        };
      });
    `
  }, function(results) {
    // Store the collected data
    contentData = results[0].map(post => new ContentDataSchema(post.content, post.likes, post.comments, post.retweets));
    // Send message to initiate content categorization
    chrome.runtime.sendMessage({ message: 'categorizeContent' });
  });
}

// Listen for 'collectData' message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'collectData') {
    collectData();
  }
});
```