# Bitbucket and evennode

1. Repository settings -> SSH keys
2. Generate ssh key and copy public key
3. copy public key past to https://admin.evennode.com/a/profile "Public keys for Git"
4. Repository settings -> SSH keys -> Known hosts past this "git.evennode.com" and click btn fetch
5. bitbucket-pipelines.yml
   pipelines:
   branches:
   master: - step:
   name: PUSH
   script: - git fetch --unshallow - git push git@git.evennode.com:bc6b31f00df305f3e0885f4ae71b3fb8.git master
6. Done
