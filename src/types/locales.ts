export type LocaleType = "en" | "ru";

export const SUPPORTED_LOCALES: LocaleType[] = ["en", "ru"];

export interface Translations {
    common: {
        search: string;
        tryAgain: string;
        welcome: string;
        myLocation: string;
        youAreIn: string;
        countries: string;
        noCountriesFound: string;
    };
    auth: {
        login: string;
        signOut: string;
        myAccount: string;
        loginWith: string;
        signInWith: string;
        terms: string;
        success: string;
        error: string;
    };
    note: {
        validation: {
            nameRequired: string;
            messageRequired: string;
            socialUrlInvalid: string;
        };
        create: {
            title: string;
            description: string;
            name: string;
            nameDescription: string;
            message: string;
            messageDescription: string;
            messagePlaceholder: string;
            social: string;
            socialDescription: string;
            submit: string;
            success: string;
            loading: string;
            error: string;
        };
        delete: {
            success: string;
            error: string;
        };
    };
    error: {
        map: {
            title: string;
            description: string;
        };
    };
    commandCombo: {
        search: string;
        add: string;
    };
}
