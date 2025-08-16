<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Activity 6: Render a list containing author names and their birth years. Hint: Make use of the v-for directive to iterate through the array of authors. -->
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <!-- Activity 7: Render a list containing authors born after 1850. Hint: Make use of the v-for directive to iterate through the array of authors that you have filtered out. -->
      <p>Authors born after 1850:</p>
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 8: Render a list of all famous works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
        <!-- TODO: CODE TO RENDER LIST OF FAMOUS WORKS HERE -->
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9: Render a list of Austen's works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
      <!-- TODO: CODE TO RENDER LIST OF AUSTEN'S WORKS HERE -->
      <ul>
        <li v-for="work in austen?.famousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company:
        <!-- Activity 9a: Get the company name from the bookstores object. -->
        <!-- TODO: CODE TO GET COMPANY NAME HERE -->
        {{ bookstores.company }}
      </p>

      <p>
        Total Stores:
        <!-- Activity 9b: Get the total number of stores from the bookstores object. -->
        <!-- TODO: CODE TO GET TOTAL STORES HERE -->
        {{ bookstores.totalStores }}
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <!-- TODO: CODE TO RENDER LIST OF STORE TYPES HERE -->
      <ul>
        <li v-for="storeType in bookstores.storeTypes" :key="storeType.type">
          {{ storeType.type }}: {{ storeType.count }} stores
        </li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <!-- TODO: CODE TO RENDER LIST OF OPENING HOURS HERE -->
      <ul>
        <li v-for="(hours, day) in bookstores.openingHours" :key="day">
          {{ day }}: {{ hours.open }} - {{ hours.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <!-- TODO: CODE TO GET TOP SELLERS HERE -->
      <p>We operate in:</p>
      <ul>
        <li v-for="location in bookstores.locations" :key="location">
          {{ location }}
        </li>
      </ul>
      <p>Our #1 seller: {{ bookstores.topSellers[0] }}</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->
      <!-- TODO: CODE TO TOGGLE MESSAGE VISIBILITY HERE. Hint: Use the v-if directive. -->
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>

      <!-- George Orwell Highlight Functionality -->
      <div class="orwell-highlight-section">
        <h4>George Orwell Highlight Demo:</h4>
        <button @click="toggleOrwellHighlight" :class="{ 'active-button': isOrwellHighlighted }">
          {{ isOrwellHighlighted ? 'Remove' : 'Add' }} George Orwell Highlight
        </button>
      </div>

      <ul class="authors-list">
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{
            'orwell-highlight': author.name === 'George Orwell' && isOrwellHighlighted,
            'author-item': true,
            'featured-author': author.name === 'George Orwell',
          }"
          :style="getAuthorStyle(author)"
          :data-author="author.name"
          :title="
            author.name === 'George Orwell'
              ? 'Famous dystopian novelist'
              : `Author born in ${author.birthYear}`
          "
        >
          <div class="author-content">
            <span
              class="author-name"
              :style="{
                color: author.name === 'George Orwell' && isOrwellHighlighted ? '#fff' : 'inherit',
                fontWeight: author.name === 'George Orwell' ? 'bold' : 'normal',
              }"
            >
              {{ author.name }}
            </span>

            <span class="author-year"> ({{ author.birthYear }}) </span>

            <!-- Special badge for George Orwell -->
            <span
              v-if="author.name === 'George Orwell'"
              class="orwell-badge"
              :class="{ 'highlighted-badge': isOrwellHighlighted }"
            >
              FEATURED
            </span>
          </div>

          <!-- Show famous works when highlighted -->
          <div
            v-if="author.name === 'George Orwell' && isOrwellHighlighted"
            class="orwell-works"
            :style="{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '10px',
              marginTop: '10px',
              borderRadius: '5px',
            }"
          >
            <p style="margin: 0 0 5px 0; font-weight: bold; color: #fff">Famous Works:</p>
            <ul style="margin: 0; padding-left: 20px">
              <li
                v-for="work in author.famousWorks"
                :key="work.title"
                style="color: #fff; margin: 2px 0"
              >
                {{ work.title }} ({{ work.year }})
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
// TODO: CODE TO IMPORT JSON FILES HERE
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

const showMessage = ref(false)

// George Orwell highlight functionality
const isOrwellHighlighted = ref(false)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => {
  return authors.filter((author) => author.birthYear > 1850)
  // TODO: CODE TO FILTER ARRAY OF AUTHORS HERE
})

// Activity 3: Get all famous works
const allFamousWorks = computed(() => {
  return authors.flatMap((author) => author.famousWorks.map((work) => work.title))
  // TODO: CODE TO GET ALL FAMOUS WORKS HERE
})

// Activity 4: Find author by name
const orwell = computed(() => {
  return authors.find((author) => author.name === 'George Orwell')
  // TODO: CODE TO FIND AUTHOR BY NAME HERE
})

// Activity 5: Find author by ID
const austen = computed(() => {
  return authors.find((author) => author.id === 1)
  // TODO: CODE TO FIND AUTHOR BY ID HERE
})

// Methods for George Orwell highlight functionality
const toggleOrwellHighlight = () => {
  isOrwellHighlighted.value = !isOrwellHighlighted.value
}

const getAuthorStyle = (author) => {
  if (author.name === 'George Orwell' && isOrwellHighlighted.value) {
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      transform: 'scale(1.05)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      border: '3px solid #4c63d2',
      animation: 'pulse 2s infinite',
    }
  } else if (author.name === 'George Orwell') {
    return {
      border: '2px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
    }
  }
  return {}
}
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

/* George Orwell Highlight Styles */
.orwell-highlight-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.orwell-highlight-section h4 {
  margin-top: 0;
  color: #495057;
}

.orwell-highlight-section button {
  padding: 10px 20px;
  border: 2px solid #667eea;
  background-color: #fff;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.orwell-highlight-section button:hover {
  background-color: #667eea;
  color: #fff;
  transform: translateY(-2px);
}

.orwell-highlight-section button.active-button {
  background-color: #667eea;
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.authors-list .author-item {
  transition: all 0.5s ease;
  cursor: default;
  position: relative;
  overflow: hidden;
}

.orwell-highlight {
  color: #fff !important;
  border-radius: 10px !important;
  margin: 10px 0 !important;
  position: relative;
}

.featured-author {
  position: relative;
}

.author-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.author-name {
  font-size: 1.1em;
  transition: all 0.3s ease;
}

.author-year {
  margin: 0 10px;
  font-style: italic;
  opacity: 0.8;
}

.orwell-badge {
  background-color: #ffc107;
  color: #212529;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: bold;
  transition: all 0.3s ease;
}

.highlighted-badge {
  background-color: #fff !important;
  color: #667eea !important;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  animation: glow 2s infinite alternate;
}

.orwell-works {
  animation: slideDown 0.5s ease-out;
}

/* Keyframe Animations */
@keyframes pulse {
  0% {
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  50% {
    box-shadow: 0 8px 35px rgba(102, 126, 234, 0.7);
  }
  100% {
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
}

@keyframes glow {
  from {
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
  }
  to {
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.6);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
