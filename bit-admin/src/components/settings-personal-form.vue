<template>
  <form>
    <div class="space-y-12 sm:space-y-16">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('publicProfile') }}</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          {{ $t('publicProfileInfo') }}
        </p>
        <!--      {{currentLanguage}}-->
        <select @change="changeLanguage" v-model="currentLanguage">
          <option value="en-US">English</option>
          <option value="uk-UA">Українська</option>
        </select>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('companyName')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  :value="companyName"
                  type="text"
                  name="company-name"
                  id="company-name"
                  autocomplete="company-name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="How to name you?"
                />
              </div>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('internalProfileUrl')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">www.exchange-map.com/</span>
                <input
                  :value="internalProfileUrl"
                  type="text"
                  name="company-name"
                  id="company-name"
                  autocomplete="company-name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="How to name you?"
                />
              </div>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('phone')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <MazPhoneNumberInput
                  class="flex-1"
                  v-model="phone"
                  v-model:country-code="countryCode"
                  show-code-on-list
                  country-selector-display-name
                  :preferred-countries="['UA', 'DE', 'US', 'GB']"
                  :ignored-countries="['RU', 'CN', 'KP', 'KR']"
                  :translations="{
                    countrySelector: {
                      placeholder: 'Country code',
                      // placeholder: 'Код страны',
                      error: 'Choose country',
                      // error: 'Выберите страну',
                      searchPlaceholder: 'Search a country',
                      // searchPlaceholder: 'Поиск страны',
                    },
                    phoneInput: {
                      placeholder: 'Phone number',
                      // placeholder: 'Номер телефона',
                      example: 'Example:',
                      // example: 'Пример:',
                    },
                  }"
                  @update="results = $event"
                />
              </div>
              <!--              <code>-->
              <!--                {{ results }}-->
              <!--              </code>-->
            </div>
          </div>

          <!--          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">-->
          <!--            <label for="about" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">About</label>-->
          <!--            <div class="mt-2 sm:col-span-2 sm:mt-0">-->
          <!--              <textarea id="about" name="about" rows="3" class="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />-->
          <!--              <p class="mt-3 text-sm leading-6 text-gray-600">What do you want to share about yourself</p>-->
          <!--            </div>-->
          <!--          </div>-->

          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">{{ $t('logo') }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex items-center gap-x-3">
                <settings-documents-upload />
              </div>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="site-url" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('siteUrl')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  :value="website"
                  type="text"
                  name="username"
                  id="site-url"
                  autocomplete="site-url"
                  class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Do you have a site or .. create a new one for you?"
                />
              </div>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="site-url" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              {{ $t('siteUrl') }}
            </label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  :value="website"
                  type="text"
                  name="username"
                  id="site-url"
                  autocomplete="site-url"
                  class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Do you have a site or .. create a new one for you?"
                />
              </div>
              <div class="ml-4 text-sm text-gray-500 whitespace-nowrap">
                {{ $t('needOnlineExchange') }}
                <a href="https://your-link-here.com" class="text-indigo-600 hover:text-indigo-900">{{
                  $t('clickHere')
                }}</a>
              </div>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label for="company-email" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('email')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  :value="email"
                  type="text"
                  name="company-email"
                  id="company-email"
                  autocomplete="company-email"
                  class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Company email for reporting and login"
                />
              </div>
            </div>
          </div>

          <!--          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">-->
          <!--            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Cover photo</label>-->
          <!--            <div class="mt-2 sm:col-span-2 sm:mt-0">-->
          <!--              <div class="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">-->
          <!--                <div class="text-center">-->
          <!--                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />-->
          <!--                  <div class="mt-4 flex text-sm leading-6 text-gray-600">-->
          <!--                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">-->
          <!--                      <span>Upload a file</span>-->
          <!--                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />-->
          <!--                    </label>-->
          <!--                    <p class="pl-1">or drag and drop</p>-->
          <!--                  </div>-->
          <!--                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>

      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('verificationInformation') }}</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          {{ $t('usePermanentAddress') }}
        </p>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <div class="flex items-center text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              <label for="first-name" class="mr-3">{{ $t('identityDocuments') }}</label>
              <Tooltip placement="top" max-width="200" theme="light">
                <Circle :size="30" :percent="100" stroke-color="#5cb85c">
                  <Icon type="ios-checkmark" :size="30" style="color: #5cb85c"></Icon>
                </Circle>
                <template #content>
                  <p>
                    {{ $t('documentsVerified') }} <Time :time="time" /> (<i><Time :time="time" type="datetime" /></i>)
                  </p>
                </template>
              </Tooltip>
            </div>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <settings-documents-upload
                :default-list="[
                  {
                    name: 'image-demo-1.jpg',
                    url: identityDocument,
                  },
                ]"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <div class="flex items-center text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              <label for="first-name" class="mr-3">{{ $t('companyDocuments') }}</label>
              <Tooltip placement="top" max-width="200" theme="light">
                <Circle :size="30" :percent="50" stroke-color="#ff5500">
                  <Icon type="ios-close" :size="30" style="color: #ff5500"></Icon>
                </Circle>
                <template #content>
                  <p>
                    {{ $t('attentionNeeded') }} <Time :time="time" /> (<i><Time :time="time" type="datetime" /></i>)
                  </p>
                </template>
              </Tooltip>
            </div>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <settings-documents-upload
                :default-list="[
                  {
                    name: 'image-demo-1.jpg',
                    url: companyDocument,
                  },
                  {
                    name: 'image-demo-1.jpg',
                    url: identityDocument,
                  },
                ]"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
              {{ $t('firstName') }}
            </label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="firstName"
                disabled
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 disabled:opacity-50"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('lastName')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="lastName"
                disabled
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 disabled:opacity-50"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="email-address" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('email')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="personalEmail"
                id="email-address"
                name="email-address"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('country')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Ukraine</option>
                <option>Germany</option>
                <option>UK</option>
              </select>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('streetAddress')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="verifiedAddress"
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="city" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('city')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="verifiedCity"
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="region" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('stateProvince')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="verifiedState"
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">{{
              $t('zipPostalCode')
            }}</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input
                :value="verifiedZip"
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ $t('notifications') }}</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
          {{ $t('importantChangesNotice') }}
        </p>

        <div
          class="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <fieldset>
            <legend class="sr-only">{{ $t('byEmail') }}</legend>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
              <div class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ $t('byEmail') }}</div>
              <div class="mt-4 sm:col-span-2 sm:mt-0">
                <div class="max-w-lg space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="comments" class="font-medium text-gray-900">{{ $t('comments') }}</label>
                      <p class="mt-1 text-gray-600">{{ $t('getNotifiedComments') }}</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="candidates" class="font-medium text-gray-900">{{ $t('applications') }}</label>
                      <p class="mt-1 text-gray-600">{{ $t('getNotifiedApplication') }}</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="offers" class="font-medium text-gray-900">{{ $t('companyName') }}</label>
                      <p class="mt-1 text-gray-600">{{ $t('getNotifiedProcessed') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <!--                    <fieldset>-->
          <!--                      <legend class="sr-only">Push Notifications</legend>-->
          <!--                      <div class="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">-->
          <!--                        <div class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Push Notifications</div>-->
          <!--                        <div class="mt-1 sm:col-span-2 sm:mt-0">-->
          <!--                          <div class="max-w-lg">-->
          <!--                            <p class="text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>-->
          <!--                            <div class="mt-6 space-y-6">-->
          <!--                              <div class="flex items-center gap-x-3">-->
          <!--                                <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />-->
          <!--                                <label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900">Everything</label>-->
          <!--                              </div>-->
          <!--                              <div class="flex items-center gap-x-3">-->
          <!--                                <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />-->
          <!--                                <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">Same as email</label>-->
          <!--                              </div>-->
          <!--                              <div class="flex items-center gap-x-3">-->
          <!--                                <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />-->
          <!--                                <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>-->
          <!--                              </div>-->
          <!--                            </div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                    </fieldset>-->
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">{{ $t('cancel') }}</button>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ $t('save') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import SettingsDocumentsUpload from '@/components/settings-documents-upload.vue';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

const phone = ref(authStore.userInfo?.phone || '');
const companyName = ref(authStore.userInfo?.companyName || '');
const companyLogo = ref(authStore.userInfo?.companyLogo || '');
const email = ref(authStore.userInfo?.email || '');
const website = ref(authStore.userInfo?.website || '');
const countryCode = ref('UA');
const results = ref();
const time = new Date().getTime() - 86400 * 3 * 1000;
const companyDocument = ref(authStore.userInfo?.companyDocument || '');
const identityDocument = ref(authStore.userInfo?.identityDocument || '');

const firstName = ref('Vlastelin');
const lastName = ref('Obmen');
const personalEmail = ref('weexchange@admin.co');
const verifiedAddress = ref('Dr Narovid Str 211');
const verifiedCity = ref('Kharkiv');
const verifiedState = ref('Kharkiv');
const verifiedZip = ref('61184');
const internalProfileUrl = ref('we-exchange');

// import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const currentLanguage = ref('en-US');

const changeLanguage = () => {
  locale.value = currentLanguage.value;
};
</script>

<style>
@import '~maz-ui/css/main.css';
</style>
