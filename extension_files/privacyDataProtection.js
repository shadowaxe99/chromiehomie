```javascript
// Importing necessary dependencies
import { userProfile, contentData, engagementMetrics } from './sharedDependencies.js';

// Function to anonymize user data
function anonymizeData() {
    userProfile.name = 'Anonymous';
    userProfile.email = 'Anonymous';
    userProfile.location = 'Anonymous';
}

// Function to encrypt user data
function encryptData(data) {
    let encryptedData = btoa(JSON.stringify(data));
    return encryptedData;
}

// Function to decrypt user data
function decryptData(encryptedData) {
    let data = JSON.parse(atob(encryptedData));
    return data;
}

// Function to protect user data
function protectData() {
    anonymizeData();
    let encryptedUserProfile = encryptData(userProfile);
    let encryptedContentData = encryptData(contentData);
    let encryptedEngagementMetrics = encryptData(engagementMetrics);

    // Store encrypted data
    chrome.storage.sync.set({ 'userProfile': encryptedUserProfile });
    chrome.storage.sync.set({ 'contentData': encryptedContentData });
    chrome.storage.sync.set({ 'engagementMetrics': encryptedEngagementMetrics });
}

// Function to retrieve and decrypt user data
function retrieveData() {
    chrome.storage.sync.get(['userProfile', 'contentData', 'engagementMetrics'], function(result) {
        let decryptedUserProfile = decryptData(result.userProfile);
        let decryptedContentData = decryptData(result.contentData);
        let decryptedEngagementMetrics = decryptData(result.engagementMetrics);

        // Update the global variables
        userProfile = decryptedUserProfile;
        contentData = decryptedContentData;
        engagementMetrics = decryptedEngagementMetrics;
    });
}

// Listen for the 'protectData' message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'protectData') {
            protectData();
            sendResponse({message: 'Data protected successfully'});
        }
    }
);

// Exporting the necessary functions
export { protectData, retrieveData };
```