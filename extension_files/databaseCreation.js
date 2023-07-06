```javascript
// Importing required dependencies
const chromeStorage = chrome.storage.local;

// Defining the database
let consumerProfileDatabase = {};

// Function to create the database
function createDatabase() {
    // Combine userProfile, contentData, and engagementMetrics into a single object
    let combinedData = {
        userProfile: userProfile,
        contentData: contentData,
        engagementMetrics: engagementMetrics
    };

    // Add the combined data to the consumerProfileDatabase
    consumerProfileDatabase[userProfile.id] = combinedData;

    // Save the consumerProfileDatabase to Chrome Storage
    chromeStorage.set({ 'consumerProfileDatabase': consumerProfileDatabase }, function() {
        console.log('Consumer Profile Database has been created and saved.');
    });
}

// Listen for the 'createDatabase' message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'createDatabase') {
            createDatabase();
            sendResponse({message: 'Database created successfully.'});
        }
    }
);
```