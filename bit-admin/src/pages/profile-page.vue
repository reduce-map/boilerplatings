<template>
  <div class="mx-auto max-w-7xl">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="Name" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
      </FormItem>
      <FormItem label="Phone" prop="phone">
        <Input v-model="formValidate.phone" placeholder="Enter your phone number"></Input>
      </FormItem>
      <FormItem label="City" prop="city">
        <Select v-model="formValidate.city" placeholder="Select your city">
          <Option value="new_york">New York</Option>
          <Option value="london">London</Option>
          <Option value="sydney">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="Date">
        <Row>
          <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Gender" prop="gender">
        <RadioGroup v-model="formValidate.gender">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Payment Method" prop="paymentMethod">
        <Select v-model="formValidate.paymentMethod" placeholder="Select payment method">
          <Option value="bank_transfer">Bank Transfer</Option>
          <Option value="credit_card">Credit Card</Option>
          <Option value="paypal">PayPal</Option>
        </Select>
      </FormItem>
      <FormItem label="Amount" prop="amount">
        <Input v-model="formValidate.amount" type="number" placeholder="Enter amount"></Input>
      </FormItem>
      <FormItem label="Currency" prop="currency">
        <Select v-model="formValidate.currency" placeholder="Select currency">
          <Option value="usd">USD</Option>
          <Option value="eur">EUR</Option>
          <Option value="gbp">GBP</Option>
        </Select>
      </FormItem>
      <FormItem label="Documents" prop="documents">
        <Upload v-model="formValidate.documents"></Upload>
      </FormItem>
      <FormItem label="Desc" prop="desc">
        <Input
          v-model="formValidate.desc"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>

    <profile-component />
  </div>
</template>

<script>
import ProfileComponent from '@/components/profile-component.vue';

export default {
  components: { ProfileComponent },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        phone: '',
        city: '',
        gender: '',
        paymentMethod: '',
        amount: '',
        currency: '',
        date: '',
        time: '',
        documents: [],
        desc: '',
      },
      ruleValidate: {
        name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' },
        ],
        phone: [{ required: true, message: 'Phone number cannot be empty', trigger: 'blur' }],
        city: [{ required: true, message: 'Please select the city', trigger: 'change' }],
        gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
        paymentMethod: [{ required: true, message: 'Please select payment method', trigger: 'change' }],
        amount: [{ required: true, message: 'Amount cannot be empty', trigger: 'blur' }],
        currency: [{ required: true, message: 'Please select currency', trigger: 'change' }],
        date: [{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }],
        time: [{ required: true, type: 'string', message: 'Please select time', trigger: 'change' }],
        desc: [
          { required: true, message: 'Please enter a description', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Description must be at least 20 characters', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
