export const replaceText = (text, replacer = []) => {
    let show = text;
    replacer.map(item => show = show.replaceAll(item, ''));
    return show;
}