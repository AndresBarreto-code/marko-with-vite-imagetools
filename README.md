#  Issue: Assets from Server-Only Marko Components Are Dropped by Vite
# Problem
When importing assets (e.g. images via `vite-imagetools`) inside Marko components used only in the server build, those assets are not emitted to `dist/public/assets`.

Even though `emitFile()` is called (confirmed via logging), the assets are silently dropped unless the component explicity become a client-component.

# Debugging

```
npm install
npm run build
```
OR
```
npm install
npm run preview
```
You will see no serve-image is being built in `dist/public/assets`.


# Why It Matters
- Assets used in SSR components vanish from production builds
- Devs are forced to restructure components or fake client usage
- It breaks expected behavior when using Vite plugins like vite-imagetools



