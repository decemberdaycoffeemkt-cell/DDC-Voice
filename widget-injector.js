/**
 * December Day Coffee - AI Voice Call Widget Injector
 * 
 * This script dynamically embeds the floating AI Voice Call Button onto the December Day Coffee website.
 * Designed to bypass GTM validation rules (using Base64 SVGs) and stay alive through Nuxt/Vue DOM hydration (using MutationObserver).
 */
(function() {
  var widgetId = 'ddc-voice-widget';
  
  // Prevent duplicate injections
  if (document.getElementById(widgetId)) return;

  // 1. Create main container
  var container = document.createElement('div');
  container.id = widgetId;
  container.style.position = 'fixed';
  container.style.bottom = '30px';
  container.style.right = '30px';
  container.style.zIndex = '999999'; // High z-index to stay on top of other content
  container.style.fontFamily = 'sans-serif';

  // 2. Create Floating Button
  var btn = document.createElement('button');
  btn.id = 'ddc-voice-btn';
  btn.style.backgroundColor = '#0e7b4b';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '50px';
  btn.style.width = '60px';
  btn.style.height = '60px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 8px 24px rgba(14, 123, 75, 0.3)';
  btn.style.display = 'flex';
  btn.style.alignItems = 'center';
  btn.style.justifyContent = 'center';
  btn.style.transition = 'all 0.3s ease';

  // Base64 SVGs to bypass GTM custom HTML validation perfectly
  // Call Icon SVG: phone-incoming
  var callSvgBase64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMiAxOS43OSAxOS43OSAwIDAgMS04LjYzLTMuMDcgMTkuNSAxOS41IDAgMCAxLTYtNiAxOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjdBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxYTE2IDE2IDAgMCAwIDYgNmwxLjI3LTEuMjdhMiAyIDAgMCAxIDIuMTEtLjQ1IDEyLjg0IDEyLjg0IDAgMCAwIDIuODEuN0EyIDIgMCAwIDEgMjIgMTYuOTJ6Ij48L3BhdGg+PC9zdmc+';
  // Close Icon SVG: x
  var closeSvgBase64 = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGxpbmUgeDE9IjE4IiB5MT0iNiIgeDI9IjYiIHkyPSIxOCI+PC9saW5lPjxsaW5lIHgxPSI2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iMTgiPjwvbGluZT48L3N2Zz4=';

  // Helper to decode Base64 safely
  function decodeSvg(base64Str) {
    try {
      return window.atob(base64Str);
    } catch(e) {
      // Fallback in case window.atob is restricted or has an issue
      return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle></svg>';
    }
  }

  btn.innerHTML = decodeSvg(callSvgBase64);
  container.appendChild(btn);

  // 3. Create Voice Modal Dialog Wrapper
  var modal = document.createElement('div');
  modal.id = 'ddc-voice-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.bottom = '100px';
  modal.style.right = '30px';
  modal.style.width = '410px';
  modal.style.height = '650px';
  modal.style.borderRadius = '30px';
  modal.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
  modal.style.overflow = 'hidden';
  modal.style.background = 'white';
  modal.style.border = '1px solid rgba(0, 0, 0, 0.08)';
  modal.style.transition = 'all 0.3s ease';
  modal.style.zIndex = '999999';

  // Responsive Stylesheet for mobile screens
  var styleTag = document.createElement('style');
  styleTag.innerHTML = '@media (max-width: 480px) { ' +
    '#ddc-voice-modal { ' +
      'width: calc(100% - 40px) !important; ' +
      'height: calc(100% - 120px) !important; ' +
      'bottom: 90px !important; ' +
      'right: 20px !important; ' +
    '} ' +
  '}';
  document.head.appendChild(styleTag);

  // 4. Create iframe referencing the deployed AI Voice Agent on GitHub Pages
  var iframe = document.createElement('iframe');
  iframe.src = 'https://decemberdaycoffeemkt-cell.github.io/DDC-Voice/';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.setAttribute('allow', 'microphone'); // Enable microphone access within iframe
  modal.appendChild(iframe);
  container.appendChild(modal);

  // 5. Button hover effects
  btn.addEventListener('mouseenter', function() {
    btn.style.transform = 'scale(1.08) translateY(-2px)';
  });
  btn.addEventListener('mouseleave', function() {
    btn.style.transform = 'scale(1) translateY(0)';
  });

  // 6. Click event to toggle modal display
  btn.addEventListener('click', function() {
    if (modal.style.display === 'none') {
      modal.style.display = 'block';
      btn.style.backgroundColor = '#d9534f'; // Change background to red
      btn.innerHTML = decodeSvg(closeSvgBase64);
    } else {
      modal.style.display = 'none';
      btn.style.backgroundColor = '#0e7b4b'; // Return to brand green
      btn.innerHTML = decodeSvg(callSvgBase64);
    }
  });

  // 7. Robust Injection & Protection logic
  function mountWidget() {
    if (document.body) {
      var existing = document.getElementById(widgetId);
      if (!existing) {
        document.body.appendChild(container);
      }
    }
  }

  // Initial trigger
  if (document.readyState !== 'loading') {
    mountWidget();
  } else {
    document.addEventListener('DOMContentLoaded', mountWidget);
  }

  // Backup polling to guard against Nuxt hydration wipe
  var mountInterval = setInterval(mountWidget, 1000);

  // Mutation observer to detect and instantly repair Vue DOM overwrites
  if (window.MutationObserver) {
    var observer = new MutationObserver(function(mutations) {
      var widgetDeleted = false;
      for (var i = 0; i < mutations.length; i++) {
        var removedNodes = mutations[i].removedNodes;
        for (var j = 0; j < removedNodes.length; j++) {
          if (removedNodes[j].id === widgetId) {
            widgetDeleted = true;
            break;
          }
        }
        if (widgetDeleted) break;
      }
      if (widgetDeleted) {
        mountWidget();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
