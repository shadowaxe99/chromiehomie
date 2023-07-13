```javascript
// Importing necessary dependencies
import { collectData } from './dataCollection.js';
import { categorizeContent } from './contentCategorization.js';
import { determineInterest } from './userInterestDetermination.js';
import { createDatabase } from './databaseCreation.js';
import { refineProfile } from './profileRefinement.js';
import { protectData } from './privacyDataProtection.js';
import { deriveInsights } from './insightsApplications.js';

// Defining global variables
let userProfile = {};
let contentData = {};
let engagementMetrics = {};

// Function to initialize the extension
function initExtension() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
      case 'collectData':
        collectData(request.data)
          .then(data => {
            contentData = data;
            displayData('contentDisplay', contentData);
          });
        break;
      case 'categorizeContent':
        categorizeContent(contentData)
          .then(categories => {
            contentData = categories;
            displayData('contentDisplay', contentData);
          });
        break;
      case 'determineInterest':
        determineInterest(contentData)
          .then(profile => {
            userProfile = profile;
            displayData('profileDisplay', userProfile);
          });
        break;
      case 'createDatabase':
        createDatabase(userProfile)
          .then(database => {
            displayData('databaseDisplay', database);
          });
        break;
      case 'refineProfile':
        refineProfile(userProfile)
          .then(refinedProfile => {
            userProfile = refinedProfile;
            displayData('profileDisplay', userProfile);
          });
        break;
      case 'protectData':
        protectData(userProfile);
        break;
      case 'deriveInsights':
        deriveInsights(userProfile)
          .then(insights => {
            displayData('insightsDisplay', insights);
          });
        break;
      default:
        console.log('Unknown message received');
    }
  });
}

// Function to display data
function displayData(elementId, data) {
  const element = document.getElementById(elementId);
  element.textContent = JSON.stringify(data, null, 2);
}

// Initialize the extension
initExtension();
```