---
to: src/components/atoms/a-<%= name %>/index.js
---
import A<%= h.changeCase.pascalCase( name ) %> from './a-<%= name %>.vue'

export default A<%= h.changeCase.pascalCase( name ) %>
