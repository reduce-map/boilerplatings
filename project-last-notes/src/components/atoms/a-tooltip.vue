<template>
    <VPopover v-bind="$attrs" v-on="$listeners">
        <slot />
        <template slot="popover">
            <slot name="popover" />
        </template>
    </VPopover>
</template>
<script>
import { VPopover } from 'v-tooltip'
export default {
    name: 'ATooltip',
    components: {
        VPopover,
    },
}
</script>

<style lang="scss" scoped>
.tooltip {
    z-index: 10000;
    display: block !important;

    .tooltip-inner {
        padding: 5px 10px 4px;
        color: white;
        background: black;
        border-radius: 16px;
    }

    .tooltip-arrow {
        position: absolute;
        z-index: 1;
        width: 0;
        height: 0;
        margin: 5px;
        border-color: black;
        border-style: solid;
    }

    &[x-placement^='top'] {
        margin-bottom: 5px;

        .tooltip-arrow {
            bottom: -5px;
            left: calc(50% - 5px);
            margin-top: 0;
            margin-bottom: 0;
            border-width: 5px 5px 0 5px;
            border-right-color: transparent !important;
            border-bottom-color: transparent !important;
            border-left-color: transparent !important;
        }
    }

    &[x-placement^='bottom'] {
        margin-top: 5px;

        .tooltip-arrow {
            top: -5px;
            left: calc(50% - 5px);
            margin-top: 0;
            margin-bottom: 0;
            border-width: 0 5px 5px 5px;
            border-top-color: transparent !important;
            border-right-color: transparent !important;
            border-left-color: transparent !important;
        }
    }

    &[x-placement^='right'] {
        margin-left: 5px;

        .tooltip-arrow {
            top: calc(50% - 5px);
            left: -5px;
            margin-right: 0;
            margin-left: 0;
            border-width: 5px 5px 5px 0;
            border-top-color: transparent !important;
            border-bottom-color: transparent !important;
            border-left-color: transparent !important;
        }
    }

    &[x-placement^='left'] {
        margin-right: 5px;

        .tooltip-arrow {
            top: calc(50% - 5px);
            right: -5px;
            margin-right: 0;
            margin-left: 0;
            border-width: 5px 0 5px 5px;
            border-top-color: transparent !important;
            border-right-color: transparent !important;
            border-bottom-color: transparent !important;
        }
    }

    &.popover {
        $color: #f9f9f9;

        .popover-inner {
            padding: 24px;
            color: black;
            background: $color;
            border-radius: 5px;
            box-shadow: 0 5px 30px rgba(black, 0.1);
        }

        .popover-arrow {
            border-color: $color;
        }
    }

    &[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.15s, visibility 0.15s;
    }

    &[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.15s;
    }
}
</style>

<docs>
## Examples

Popover usage

```jsx
<v-popover>
    <!-- This will be the popover target (for the events and position) -->
    <button>Click me</button>
    <!-- This will be the content of the popover -->
    <template slot="popover">
        <h2>Popover from slot as a component</h2>
    </template>
</v-popover>
```
</docs>
