<template>
    <div id="app">
        <router-view :key="$route.fullPath" />
        <app-notifications />
    </div>
</template>

<script>
import AppNotifications from '@/components/app-notifications'

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

strong {
    font-weight: bold;
}
// ===
// Imports
// ===
// @import '~viewerjs/dist/viewer.css';

// ===
// Main element styles
// ===
#app {
    width: 90%;
    max-width: 1100px;
    padding: 30px 20px 20px;
    margin: 0 auto;
    font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
    line-height: 1.5;
}
h1 {
    margin-bottom: 30px;
    font-size: 32px;
    text-align: center;
}
</style>
