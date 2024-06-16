let animation: Animation;

const androidClickEffect = function (event: any, el: HTMLElement, scale: number) {
    let effectExists = document.querySelector<HTMLElement>('.android-click-effect')
    if (effectExists) {
        effectExists.remove()
    }
    let clickX = event.clientX - el.getBoundingClientRect().left,
        clickY = event.clientY - el.getBoundingClientRect().top,
        effect = document.createElement('span');

    effect.className = 'android-click-effect';
    effect.style.cssText = `
        top: ${clickY}px;
        left: ${clickX}px;
        width: 2px;
        height: 2px;
        opacity: 1
    `;
    el.append(effect);
    animation = effect.animate([
        {
            '-webkit-transform': `translate(-50%, -50%) scale(0)`,
            '-moz-transform': `translate(-50%, -50%) scale(0)`,
            transform: `translate(-50%, -50%) scale(0)`
        },
        {
            '-webkit-transform': `translate(-50%, -50%) scale(${scale})`,
            '-moz-transform': `translate(-50%, -50%) scale(${scale})`,
            transform: `translate(-50%, -50%) scale(${scale})`
        }
    ], {
        duration: 450,
        fill: 'forwards'
    });
};

const androidEndClickEffect = function () {
    let effect = document.querySelector<HTMLElement>('.android-click-effect')!

    animation.onfinish = function (e) {
        fadeOut(effect)
    }
    setTimeout(() => {
        if (effect.style.opacity === '1') {
            fadeOut(effect)
        }
    }, 50)
}

function fadeOut(effect: HTMLElement) {
    let opacity = 1
    let fadeOutEffect = setInterval(function () {
        opacity = opacity - 0.1
        effect.style.opacity = opacity.toString();

        if (opacity <= 0) {
            effect.remove();
            clearInterval(fadeOutEffect);
        }
    }, 25);
}

const findElement = function (needClass: string, currentEl: HTMLElement) {
    let node = currentEl;

    // keep iterating unless null
    while (node !== null) {
        if (node.classList.contains(needClass)) {
            return node;
        }
        node = node.parentNode as HTMLElement;
    }
    return node;
};

export { androidClickEffect, androidEndClickEffect, findElement };