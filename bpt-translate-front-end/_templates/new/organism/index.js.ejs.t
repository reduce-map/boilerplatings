---
to: src/components/organisms/o-<%= name %>/index.js
---
import O<%= h.changeCase.pascalCase( name ) %> from './o-<%= name %>.vue'

export default O<%= h.changeCase.pascalCase( name ) %>
