/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'



import '@quasar/extras/animate/bounce.css'

import '@quasar/extras/animate/flash.css'

import '@quasar/extras/animate/flip.css'

import '@quasar/extras/animate/headShake.css'

import '@quasar/extras/animate/heartBeat.css'

import '@quasar/extras/animate/hinge.css'

import '@quasar/extras/animate/jello.css'

import '@quasar/extras/animate/pulse.css'

import '@quasar/extras/animate/rubberBand.css'

import '@quasar/extras/animate/shake.css'

import '@quasar/extras/animate/swing.css'

import '@quasar/extras/animate/tada.css'

import '@quasar/extras/animate/wobble.css'

import '@quasar/extras/animate/bounceIn.css'

import '@quasar/extras/animate/bounceInDown.css'

import '@quasar/extras/animate/bounceInLeft.css'

import '@quasar/extras/animate/bounceInRight.css'

import '@quasar/extras/animate/bounceInUp.css'

import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeInDown.css'

import '@quasar/extras/animate/fadeInDownBig.css'

import '@quasar/extras/animate/fadeInLeft.css'

import '@quasar/extras/animate/fadeInLeftBig.css'

import '@quasar/extras/animate/fadeInRight.css'

import '@quasar/extras/animate/fadeInRightBig.css'

import '@quasar/extras/animate/fadeInUp.css'

import '@quasar/extras/animate/fadeInUpBig.css'

import '@quasar/extras/animate/flipInX.css'

import '@quasar/extras/animate/flipInY.css'

import '@quasar/extras/animate/jackInTheBox.css'

import '@quasar/extras/animate/lightSpeedIn.css'

import '@quasar/extras/animate/rollIn.css'

import '@quasar/extras/animate/rotateIn.css'

import '@quasar/extras/animate/rotateInDownLeft.css'

import '@quasar/extras/animate/rotateInDownRight.css'

import '@quasar/extras/animate/rotateInUpLeft.css'

import '@quasar/extras/animate/rotateInUpRight.css'

import '@quasar/extras/animate/slideInDown.css'

import '@quasar/extras/animate/slideInLeft.css'

import '@quasar/extras/animate/slideInRight.css'

import '@quasar/extras/animate/slideInUp.css'

import '@quasar/extras/animate/zoomIn.css'

import '@quasar/extras/animate/zoomInDown.css'

import '@quasar/extras/animate/zoomInLeft.css'

import '@quasar/extras/animate/zoomInRight.css'

import '@quasar/extras/animate/zoomInUp.css'

import '@quasar/extras/animate/bounceOut.css'

import '@quasar/extras/animate/bounceOutDown.css'

import '@quasar/extras/animate/bounceOutLeft.css'

import '@quasar/extras/animate/bounceOutRight.css'

import '@quasar/extras/animate/bounceOutUp.css'

import '@quasar/extras/animate/fadeOut.css'

import '@quasar/extras/animate/fadeOutDown.css'

import '@quasar/extras/animate/fadeOutDownBig.css'

import '@quasar/extras/animate/fadeOutLeft.css'

import '@quasar/extras/animate/fadeOutLeftBig.css'

import '@quasar/extras/animate/fadeOutRight.css'

import '@quasar/extras/animate/fadeOutRightBig.css'

import '@quasar/extras/animate/fadeOutUp.css'

import '@quasar/extras/animate/fadeOutUpBig.css'

import '@quasar/extras/animate/flipOutX.css'

import '@quasar/extras/animate/flipOutY.css'

import '@quasar/extras/animate/lightSpeedOut.css'

import '@quasar/extras/animate/rollOut.css'

import '@quasar/extras/animate/rotateOut.css'

import '@quasar/extras/animate/rotateOutDownLeft.css'

import '@quasar/extras/animate/rotateOutDownRight.css'

import '@quasar/extras/animate/rotateOutUpLeft.css'

import '@quasar/extras/animate/rotateOutUpRight.css'

import '@quasar/extras/animate/slideOutDown.css'

import '@quasar/extras/animate/slideOutLeft.css'

import '@quasar/extras/animate/slideOutRight.css'

import '@quasar/extras/animate/slideOutUp.css'

import '@quasar/extras/animate/zoomOut.css'

import '@quasar/extras/animate/zoomOutDown.css'

import '@quasar/extras/animate/zoomOutLeft.css'

import '@quasar/extras/animate/zoomOutRight.css'

import '@quasar/extras/animate/zoomOutUp.css'


// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'




import 'src/css/app.sass'


import createApp from './app.js'
import Vue from 'vue'

import App from 'app/src/App.vue'
const appOptions = App.options || App



import qboot_Bootaxios from 'boot/axios'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, store, router } = await createApp(context)

    
    let routeUnchanged = true
    const redirect = url => {
      routeUnchanged = false
      reject({ url })
    }

    const bootFiles = [qboot_Bootaxios]
    for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
      if (typeof bootFiles[i] !== 'function') {
        continue
      }

      try {
        await bootFiles[i]({
          app,
          router,
          store,
          Vue,
          ssrContext: context,
          redirect,
          urlPath: context.url
        })
      }
      catch (err) {
        reject(err)
        return
      }
    }

    if (routeUnchanged === false) {
      return
    }
    

    const
      { url } = context,
      { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
        .map(m => m.options /* Vue.extend() */ || m)

      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      

      let routeUnchanged = true
      const redirect = url => {
        routeUnchanged = false
        reject({ url })
      }

      appOptions.preFetch && matchedComponents.unshift(appOptions)

      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      matchedComponents
      .filter(c => c && c.preFetch)
      .reduce(
        (promise, c) => promise.then(() => routeUnchanged && c.preFetch({
          store,
          ssrContext: context,
          currentRoute: router.currentRoute,
          redirect
        })),
        Promise.resolve()
      )
      .then(() => {
        if (!routeUnchanged) { return }

        context.state = store.state

        
        resolve(new Vue(app))
        
      })
      .catch(reject)

      
    }, reject)
  })
}