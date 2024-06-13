// Array of character images
const characterImages = [
    '../Img/Charater/Character/Character_2.png',
    '../Img/Charater/Character/Character_3.png',
    '../Img/Charater/Character/Character_4.png',
    '../Img/Charater/Character/Character_5.png',
    '../Img/Charater/Character/Character_6.png'
    // Add more character images as needed
];

// Open the modal
function openModal() {
    document.getElementById('characterModal').style.display = "block";
}

// Close the modal
function closeModal() {
    document.getElementById('characterModal').style.display = "none";
}

// Select the character and change the image
function selectCharacter(index) {
    document.getElementById('selectedCharacterImg').src = characterImages[index];
    closeModal();
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('characterModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}