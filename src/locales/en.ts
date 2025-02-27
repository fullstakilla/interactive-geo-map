import { Translations } from "@/types/locales";

export const en: Translations = {
    common: {
        search: "Search countries...",
        tryAgain: "Try Again",
        welcome: "Welcome, {{name}}!",
        myLocation: "My Location",
        youAreIn: "You are in:",
        countries: "Countries",
        noCountriesFound: "No countries found.",
    },
    auth: {
        success: "Successfully signed in. Refreshing.",
        error: "Error happened. Try again.",
        login: "Login",
        signOut: "Sign Out",
        myAccount: "My Account",
        loginWith: "Login with socials",
        signInWith: "Sign in with {{provider}}",
        terms: "By accessing this site, you agree to our Terms and Conditions and Privacy Policy. Posting harmful, misleading, or inappropriate content, including hate comments, negativity, or discussions about unrelated groups, is strictly prohibited to maintain a positive and respectful fan community.",
    },
    note: {
        create: {
            title: "Create New Post",
            description:
                "Make sure to approve your geolocation after submitting.",
            name: "Name",
            nameDescription: "Your display name for the post.",
            message: "Message",
            messageDescription: "Share your thoughts with the community.",
            messagePlaceholder: "What's on your mind?",
            social: "Social Media Link (optional)",
            socialDescription: "Add a Instagram, Twitter, or Youtube link.",
            submit: "Create Post",
            success: "Note created successfully!",
            loading: "Creating your note...",
            error: "Failed to create note",
        },
        delete: {
            success: "Your note was deleted",
            error: "Failed to delete note",
        },
        validation: {
            nameRequired: "Name is required",
            messageRequired: "Message is required",
            socialUrlInvalid:
                "Only YouTube, Twitter, or Instagram URLs are allowed",
        },
    },
    error: {
        map: {
            title: "Map Loading Error",
            description: "Failed to load geographical data",
        },
    },
    commandCombo: {
        search: "K",
        add: "A",
    },
};
