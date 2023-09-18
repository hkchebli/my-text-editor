const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // This will be used to show the browser's install prompt at the right time

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event fired');

    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = event;

    // Update the install button's state (e.g., make it visible)
    butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Hide the install button
    butInstall.style.display = 'none';

    // Show the install prompt
    if (deferredPrompt) {
        deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);

        // We no longer need the prompt, clear it up
        deferredPrompt = null;
    }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');
});
