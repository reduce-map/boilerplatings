export default function getSizeFromProp(size) {
    switch (size) {
        case 'sm':
            return 'sm'
        case 'md':
            return 'md'
        case 'lg':
            return 'lg'
        default:
            return 'md'
    }
}
