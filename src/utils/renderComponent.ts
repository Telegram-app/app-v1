import {h, render} from 'vue';

export default function renderComponent({el, component, props, onClick}: any) {
    let vNode: any = h(component, {...props, onClick});
    render(vNode, el);

    return () => {
        render(null, el);
        vNode = undefined;
    };
}