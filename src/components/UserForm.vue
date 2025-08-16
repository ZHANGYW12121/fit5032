<template>
  <div class="container-fluid px-3 px-sm-4 px-lg-5 mt-3 mt-md-5">
    <div class="row">
      <!-- Responsive container: full width on xs/sm, constrained on larger screens -->
      <div class="col-12 col-md-10 col-lg-8 col-xl-6 offset-md-1 offset-lg-2 offset-xl-3">
        <h1 class="text-center mb-4 h2 h1-md">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <!-- Username and Password Row - Stack on small screens -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6 mb-3 mb-sm-0">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Australian Resident and Gender Row - Stack on small screens -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6 mb-3 mb-sm-0">
              <div class="form-check d-flex align-items-center h-100">
                <input
                  type="checkbox"
                  class="form-check-input me-2"
                  id="isAustralian"
                  @change="() => validateResident(true)"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
              </div>
              <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
                v-model="formData.gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason textarea - Full width -->
          <div class="mb-4">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"
              placeholder="Please tell us why you'd like to join..."
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>

          <!-- Buttons - Stack on extra small screens, inline on larger -->
          <div class="d-grid d-sm-flex justify-content-sm-center gap-2">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-outline-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- PrimeVue DataTable Section -->
    <div class="row mt-4 mt-md-5" v-if="submittedCards.length">
      <div class="col-12">
        <h2 class="text-center mb-4 h3 h2-md">Submitted Information</h2>
        <div class="datatable-wrapper">
          <DataTable
            :value="submittedCards"
            :paginator="true"
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
            stripedRows
            responsiveLayout="scroll"
            class="p-datatable-sm"
          >
            <Column field="username" header="Username" sortable style="min-width: 8rem">
              <template #body="{ data }">
                <span class="font-medium">{{ data.username }}</span>
              </template>
            </Column>

            <Column field="password" header="Password" style="min-width: 8rem">
              <template #body="{ data }">
                <span class="text-muted">{{ '•'.repeat(data.password.length) }}</span>
              </template>
            </Column>

            <Column
              field="isAustralian"
              header="Australian Resident"
              sortable
              style="min-width: 10rem"
            >
              <template #body="{ data }">
                <span :class="data.isAustralian ? 'bg-success' : 'bg-secondary'" class="badge">
                  {{ data.isAustralian ? 'Yes' : 'No' }}
                </span>
              </template>
            </Column>

            <Column field="gender" header="Gender" sortable style="min-width: 6rem">
              <template #body="{ data }">
                <span class="text-capitalize">{{ data.gender }}</span>
              </template>
            </Column>

            <Column field="reason" header="Reason" style="min-width: 12rem">
              <template #body="{ data }">
                <span class="text-muted" :title="data.reason">
                  {{ data.reason.length > 50 ? data.reason.substring(0, 50) + '...' : data.reason }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  // 清空错误信息
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
  }
}

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(), .? ":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (formData.value.isAustralian === null || formData.value.isAustralian === undefined) {
    if (blur) errors.value.resident = 'Please confirm your Australian residency status'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender || formData.value.gender === '') {
    if (blur) errors.value.gender = 'Please select your gender'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason.trim()

  if (reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters long'
  } else if (reason.length > 500) {
    if (blur) errors.value.reason = 'Reason must not exceed 500 characters'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
/* Custom responsive styles */
.card {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #275fda, #1e4bb8);
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}

.card-body {
  padding: 1.25rem;
}

/* Responsive typography */
@media (max-width: 575.98px) {
  .h2 {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1rem;
  }

  .form-label {
    font-size: 0.9rem;
    font-weight: 600;
  }
}

@media (min-width: 768px) {
  .h1-md {
    font-size: 2.5rem;
  }

  .h2-md {
    font-size: 2rem;
  }
}

/* Form enhancements */
.form-control:focus,
.form-select:focus {
  border-color: #275fda;
  box-shadow: 0 0 0 0.2rem rgba(39, 95, 218, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #275fda, #1e4bb8);
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 600;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1e4bb8, #1a3f9e);
  transform: translateY(-1px);
}

.btn-outline-secondary {
  padding: 0.75rem 2rem;
  font-weight: 600;
}

/* Badge styling */
.badge {
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
}

/* Responsive spacing */
@media (max-width: 575.98px) {
  .container-fluid {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

/* DataTable wrapper styling */
.datatable-wrapper {
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* Custom DataTable styling */
:deep(.p-datatable) {
  border-radius: 8px;
}

:deep(.p-datatable .p-datatable-header) {
  background: linear-gradient(135deg, #275fda, #1e4bb8);
  color: white;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  font-weight: 600;
  color: #495057;
  padding: 0.75rem;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem;
  border-color: #dee2e6;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(odd)) {
  background-color: #f8f9fa;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #e3f2fd;
}

/* Responsive table */
@media (max-width: 768px) {
  :deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  :deep(.p-datatable .p-datatable-thead > tr > th) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}
</style>
