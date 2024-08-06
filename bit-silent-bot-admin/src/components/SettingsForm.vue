<template>
  <div class="form-container">
    <Form :model="formItem" :label-width="200" :rules="rules" ref="formRef">
      <!-- General Settings Section -->
      <div class="section">
        <h3>{{ $t("generalSettings") }}</h3>
        <FormItem :label="$t('autoReLoginSteam')" prop="autoReLoginSteam">
          <i-switch v-model="formItem.autoReLoginSteam" size="large">
            <template #open>
              <span>{{ $t("on") }}</span>
            </template>
            <template #close>
              <span>{{ $t("off") }}</span>
            </template>
          </i-switch>
        </FormItem>
        <FormItem :label="$t('autoIncrementOrder')" prop="autoIncrementOrder">
          <i-switch v-model="formItem.autoIncrementOrder" size="large">
            <template #open>
              <span>{{ $t("on") }}</span>
            </template>
            <template #close>
              <span>{{ $t("off") }}</span>
            </template>
          </i-switch>
        </FormItem>
      </div>

      <!-- Price Calculation Section -->
      <div class="section">
        <h3>{{ $t("priceCalculation") }}</h3>
        <FormItem
          :label="$t('desiredProfitPercentage')"
          prop="desiredProfitPercentage"
        >
          <Input
            v-model="formItem.desiredProfitPercentage"
            placeholder="Enter percentage"
          />
        </FormItem>
        <FormItem :label="$t('minimumProfitValue')" prop="minimumProfitValue">
          <Input
            v-model="formItem.minimumProfitValue"
            placeholder="Enter value"
          ></Input>
        </FormItem>
        <FormItem :label="$t('exactProfitValue')" prop="exactProfitValue">
          <Input
            v-model="formItem.exactProfitValue"
            placeholder="Enter value"
          ></Input>
        </FormItem>
      </div>

      <!-- Filters Section -->
      <div class="section">
        <h3>{{ $t("filters") }}</h3>
        <FormItem :label="$t('glassCoefficient')" prop="glassCoefficient">
          <Input
            v-model="formItem.glassCoefficient"
            placeholder="Enter coefficient"
          ></Input>
        </FormItem>
        <FormItem :label="$t('salesPerDay')" prop="salesPerDay">
          <Input
            v-model="formItem.salesPerDay"
            placeholder="Enter sales per day"
          ></Input>
        </FormItem>
        <FormItem :label="$t('listingPosition')" prop="listingPosition">
          <Input
            v-model="formItem.listingPosition"
            placeholder="Enter position"
          ></Input>
        </FormItem>
      </div>

      <!-- Reports Section -->
      <div class="section">
        <h3>{{ $t("reports") }}</h3>
        <FormItem
          :label="$t('statisticsCollectionTime')"
          prop="statisticsCollectionTime"
        >
          <TimePicker
            type="time"
            placeholder="Select time"
            v-model="formItem.statisticsCollectionTime"
          />
        </FormItem>
        <FormItem
          :label="$t('statisticsCollectionTime')"
          prop="statisticsCollectionTime"
        >
          <TimePicker
            type="time"
            placeholder="Select time"
            v-model="formItem.statisticsCollectionTime"
          />
        </FormItem>

        <FormItem>
          <Divider />
          <Button type="primary" @click="handleSubmit">{{ $t("save") }}</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const formRef = ref();

// Form data. Assuming BE for MVP
const formItem = ref({
  autoReLoginSteam: true,
  autoIncrementOrder: false,
  desiredProfitPercentage: "",
  minimumProfitValue: "",
  exactProfitValue: "",
  glassCoefficient: "",
  salesPerDay: "",
  listingPosition: "",
  statisticsCollectionTime: null,
});

const rules = ref({
  desiredProfitPercentage: [
    {
      required: true,
      message: t("enterDesiredProfitPercentage"),
      trigger: "blur",
    },
  ],
  minimumProfitValue: [
    { required: true, message: t("enterMinimumProfitValue"), trigger: "blur" },
  ],
  exactProfitValue: [
    { required: true, message: t("enterExactProfitValue"), trigger: "blur" },
  ],
  glassCoefficient: [
    { required: true, message: t("enterGlassCoefficient"), trigger: "blur" },
  ],
  salesPerDay: [
    { required: true, message: t("enterSalesPerDay"), trigger: "blur" },
  ],
  listingPosition: [
    { required: true, message: t("enterListingPosition"), trigger: "blur" },
  ],
  statisticsCollectionTime: [
    {
      required: true,
      message: t("selectStatisticsCollectionTime"),
      trigger: "change",
    },
  ],
});

const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("Form data:", formItem.value);
    } else {
      console.error("Validation failed");
    }
  });
};
</script>

<style lang="scss" scoped>
.form-container form {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.section {
  flex: 1 1 calc(50% - 20px); /* Adjust the width as necessary */
  min-width: 300px;
  padding: 10px;
  border-radius: 8px;
}

.section h3 {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .section {
    flex: 1 1 100%;
  }
}
</style>
