function mount($node, $target) {
    if (!$target || !($target instanceof HTMLElement))
        throw new Error('target expected of type HTMLElement');
    $target.replaceWith($node);
    return $node;
}
export default mount;
