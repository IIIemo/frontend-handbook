module.exports = {
    title: 'Oggetto Frontend Handbook',
    description: '',
    base: '/frontend-handbook/',
    themeConfig: {
        sidebar: [
        {
            title: 'В первую очередь',
            collapsable: false,
            children: [
                'typing/',
                'english/',
                'googling/',
                'copyright/',
                'web/',
                'soft-skills/'
            ]
        },
        {
            title: 'Инструменты',
            collapsable: false,
            children: [
                'editors/',
                'editors/phpstorm',
                'bash/',
                'git/',
                'git/essentials',
                'git/advanced',
                'git/questions',
            ]
        },
        {
            title: 'Верстка',
            collapsable: false,
            children: [
                'html-and-css/',
                'fonts/',
                'bem/',
                'rwd/',
                'email/',
                'html-practice/'
            ]
        },
        {
            title: 'Мультимедиа',
            collapsable: false,
            children: [
                'multimedia/graphics',
                'multimedia/video',
            ]
        },
        {
            title: 'JS: язык и программирование',
            collapsable: false,
            children: [
                'javascript/',
                'javascript/regexp',
                'programming/',
            ]
        },
        {
            title: 'JS: сборка и экосистема',
            collapsable: false,
            children: [
                'build-and-bundle/',
                'build-and-bundle/npm'
            ]
        },
        {
            title: 'JS: библиотеки и фреймворки',
            collapsable: false,
            children: [
                'jquery/',
                'jquery-ui/',
                'vue/'
            ]
        },
        {
            title: 'Оптимизация и отладка',
            collapsable: false,
            children: [
                'optimization/'
            ]
        },
        {
            title: 'PHP/MySQL',
            collapsable: false,
            children: [
                'php/'
            ]
        },
        {
            title: 'Magento',
            collapsable: false,
            children: [
                'magento1/',
                'magento2/'
            ]
        }

        ]
    }
}