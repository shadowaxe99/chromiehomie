// Importing necessary dependencies
import { userProfile, contentData, engagementMetrics } from './sharedDependencies.js';

// Function to save options
function saveOptions() {
  chrome.storage.sync.set({
    userProfile: userProfile,
    contentData: contentData,
    engagementMetrics: engagementMetrics
  }, function() {
    // Update status to let user know options were saved.
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Function to restore options
function restoreOptions() {
  chrome.storage.sync.get({
    userProfile: {},
    contentData: {},
    engagementMetrics: {}
  }, function(items) {
    userProfile = items.userProfile;
    contentData = items.contentData;
    engagementMetrics = items.engagementMetrics;
  });
}

// Event listeners for saving and restoring options
document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);