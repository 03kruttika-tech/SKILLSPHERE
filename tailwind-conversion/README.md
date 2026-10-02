Tailwind conversion notes

This repository is not a git repository, so a separate git branch cannot be created by the automation.

Recommended approach to convert styles to Tailwind in an isolated way:

1. Create a new git branch locally: git init; git add .; git commit -m "wip"; git checkout -b tailwind-conversion
2. Install TailwindCSS per official docs: https://tailwindcss.com/docs/installation
3. Replace styled-components styles.ts with Tailwind utility classes in components, or create a set of presentational components under src/tailwind/ that use Tailwind classes. This keeps the original implementation while allowing a side-by-side comparison.
4. Update Storybook stories to use Tailwind classes when testing the Tailwind variant.

If you want, I can perform an automated conversion of styles.ts into Tailwind-annotated JSX components and place them under src/tailwind-conversion/ so you can review, but it is safer to do this in a branch.
