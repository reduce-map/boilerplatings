---
to: src/components/pages/p-<%= name %>/index.js
---
import P<%= h.changeCase.pascalCase( name ) %> from './p-<%= name %>.vue'

export default P<%= h.changeCase.pascalCase( name ) %>
