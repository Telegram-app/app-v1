import renderComponent from '@/utils/renderComponent.ts';

let expandedItems: Boolean[] = []

const getOrCreateLegendList = (chart: any, id: any) => {
    const legendContainer = document.getElementById(id)!;
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart: any, args: any, options: any) {
        // Создание списка
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Если в списке есть элементы - удалить их
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Получение данных из chartData
        const items = chart.options.plugins.legend.labels.generateLabels(chart); // Лэйблы
        const percents = chart.getDatasetMeta(0).controller.getDataset().data // Проценты
        const expandItems = chart.getDatasetMeta(0).controller.getDataset().labelItems // Раскрытые элементы

        items.forEach(async (item: any, index: number) => {
            // Создание элемента списка
            const li = document.createElement('li');

            if (expandedItems.length < items.length) {
                expandedItems.push(false)
            }

            if (expandedItems[index] === true) {
                li.classList.add('expanded')
            }

            // Создание квардрата с цветом
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';

            // Добавление галочки в квадрат - если элемент активен, удаление галочки - если нет
            if (item.hidden) {
                boxSpan.classList.remove('check-mark')
            } else {
                boxSpan.classList.add('check-mark')
            }

            // Событие клика (активный - неактивный)
            boxSpan.onclick = () => {
                const {type} = chart.config;

                if (type === 'pie' || type === 'doughnut') {
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
                // Обновить (заново вызвать всю функцию afterUpdate)
                chart.update()
            };

            // Создание элемента с текстом
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;

            // Добавление квадрата в элемент с текстом
            textContainer.appendChild(boxSpan);

            // Создание текста и добавление в элемент с текстом
            const text = document.createTextNode(percents[index].toFixed(2) + '% ' + item.text);
            textContainer.appendChild(text);

            renderComponent({
                el: textContainer,
                component: (await import('@/components/icons/IconChevronRight.vue')).default,
                props: {
                    h: 30,
                    w: 30,
                    color: 'grey'
                },
                onClick: () => {
                    li.classList.toggle('expanded')
                    expandedItems[index] = !expandedItems[index]
                }
            })

            // Создание раскрывающегося списка
            const expandContainer = document.createElement('ul')

            // Добавление элементов с текстом в раскрывающийся список
            expandItems[index].forEach((item: any) => {
                const li = document.createElement('li');
                const text = document.createTextNode(item.text)
                li.appendChild(text)
                expandContainer.appendChild(li)
            })

            li.appendChild(textContainer);
            li.appendChild(expandContainer)
            ul.appendChild(li);
        });
    }
};

export default htmlLegendPlugin