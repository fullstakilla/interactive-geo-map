"use server";

export async function getMessages(locale: string) {
    try {
        return (await import(`../../locales/${locale}.json`)).default;
    } catch (error) {
        return {};
    }
}
