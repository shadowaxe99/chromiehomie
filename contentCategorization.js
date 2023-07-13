```javascript
// Importing required dependencies
import { contentData, EngagementMetricsSchema } from './dataCollection.js';

// Function to categorize content
function categorizeContent() {
    // Object to store categorized content
    let categorizedContent = {};

    // Loop through each content data
    for (let content of contentData) {
        // Determine category based on engagement metrics
        let category = determineCategory(content, EngagementMetricsSchema);

        // If category is not in categorizedContent, add it
        if (!(category in categorizedContent)) {
            categorizedContent[category] = [];
        }

        // Add content to its category
        categorizedContent[category].push(content);
    }

    // Return categorized content
    return categorizedContent;
}

// Function to determine category of a content
function determineCategory(content, EngagementMetricsSchema) {
    // Logic to determine category based on engagement metrics
    // This is a placeholder and should be replaced with actual logic
    let category = 'General';

    // If likes are more than 1000 and comments are more than 100, category is 'Popular'
    if (content[EngagementMetricsSchema.likes] > 1000 && content[EngagementMetricsSchema.comments] > 100) {
        category = 'Popular';
    }

    // If retweets are more than 500, category is 'Viral'
    if (content[EngagementMetricsSchema.retweets] > 500) {
        category = 'Viral';
    }

    // Return category
    return category;
}

// Exporting categorizeContent function
export { categorizeContent };
```