<template>
    <div id="app">
        <router-view :key="$route.path" />
        <app-notifications />
    </div>
</template>

<script>
import AppNotifications from '@/components/app_notifications'

export default {
    name: 'App',
    components: {
        AppNotifications,
    },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern, no-descending-specificity

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    padding: 0;
    margin: 0;
    font: inherit;
    font-size: 100%;
    line-height: 1.4;
    vertical-align: baseline;
    border: 0;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote::before,
blockquote::after,
q::before,
q::after {
    content: '';
    content: none;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

// ===
// Imports
// ===

// animations
@import '~vue2-animate/dist/vue2-animate.min.css';

// ===
// Main element styles
// ===
body {
    min-width: 1000px;
}

#app {
    width: 1000px;
    padding: 10px 0 0;
    margin: 0 auto;
}

// ===
// Base element styles
// ===

.app-columns-holder {
    display: flex;
    justify-content: space-between;
}

.app-column {
    width: 49%;
    max-height: calc(100vh - 30px);
    overflow: auto;
}

.app-block {
    max-height: 300px;
    padding: 4px;
    margin: 0 0 6px;
    overflow: auto;
    border: 1px solid #eee;
    border-radius: 2px;
}

.app-block-clickable {
    cursor: pointer;

    &:hover {
        background: #eee;
    }
}

.app-item-active {
    background: #eee;
}

.app-item-sub-active {
    background: #eec;
}

.app-btn {
    display: inline-block;
    margin: 0 0 10px;
    cursor: pointer;
}

// styles for fixed version. could be useful
// .app-column-fixed {
//     position: fixed;
//     left: 50%;
//     width: 500px;
// }

// transitions
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.list-item {
    transition: all 1s;
}
.list-leave-active {
    display: none;
}
.list-enter {
    opacity: 0;
}
</style>
