import { Translations } from "@/types/locales";

export const ru: Translations = {
    common: {
        search: "Поиск стран...",
        tryAgain: "Попробовать снова",
        welcome: "Добро пожаловать, {{name}}!",
        myLocation: "Моя метка",
        youAreIn: "Вы находитесь в:",
        countries: "Страны",
        noCountriesFound: "Страны не найдены",
    },
    auth: {
        success: "Успешно вошли. Обновляем страницу.",
        error: "Произошла ошибка. Попробуйте снова.",
        login: "Войти",
        signOut: "Выйти",
        myAccount: "Мой аккаунт",
        loginWith: "Войти через соцсети",
        signInWith: "Войти через {{provider}}",
        terms: "Получая доступ к этому сайту, вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности. Публикация вредного, вводящего в заблуждение или неприемлемого контента, включая комментарии с ненавистью, негативом или обсуждения несвязанных групп, строго запрещена для поддержания позитивного и уважительного сообщества.",
    },
    note: {
        create: {
            title: "Создать публикацию",
            description:
                "Не забудьте разрешить доступ к геолокации после отправки.",
            name: "Имя",
            nameDescription: "Ваше отображаемое имя для публикации.",
            message: "Сообщение",
            messageDescription: "Поделитесь своими мыслями с сообществом.",
            messagePlaceholder: "О чём вы думаете?",
            social: "Ссылка на соцсети (необязательно)",
            socialDescription:
                "Добавьте ссылку на Instagram, Twitter или Youtube",
            submit: "Создать публикацию",
            success: "Публикация создана успешно!",
            loading: "Создаём вашу публикацию...",
            error: "Не удалось создать публикацию",
        },
        delete: {
            success: "Ваша публикация была удалена",
            error: "Не удалось удалить публикацию",
        },
        validation: {
            nameRequired: "Имя обязательно",
            messageRequired: "Сообщение обязательно",
            socialUrlInvalid:
                "Разрешены только ссылки на YouTube, Twitter или Instagram",
        },
    },
    error: {
        map: {
            title: "Ошибка загрузки карты",
            description: "Не удалось загрузить географические данные",
        },
    },
    commandCombo: {
        search: "Л",
        add: "Ф",
    },
};
