import { shallowMount } from '@vue/test-utils'
import Component from '@/components/UserFormSelect.vue'

describe('UserFormSelect.vue', () => {
    it('UserFormSelect is component', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('UserFormSelect pas value prop', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.vm.value).toBeDefined()
        expect(wrapper.vm.value).toEqual(10)

        wrapper.setProps({
            value: 20
        })

        expect(wrapper.vm.value).toEqual(20)
    })

    it('UserFormSelect has list prop', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.vm.list).toBeDefined()
        expect(wrapper.vm.list).toEqual([2, 5, 10])

        wrapper.setProps({
            list: [4, 18]
        })

        expect(wrapper.vm.list).toEqual([4, 18])
    })

    it('select generate input event', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.vm.select).toBeDefined()

        wrapper.vm.select(3)
        expect(wrapper.emitted('input').length).toEqual(1)
        expect(wrapper.emitted('input')[0]).toEqual([3])
    })

    it('select generate input event', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.vm.select).toBeDefined()

        wrapper.vm.select(3)
        expect(wrapper.emitted('input').length).toEqual(1)
        expect(wrapper.emitted('input')[0]).toEqual([3])
    })

    it('has list', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                value: 10
            }
        })

        expect(wrapper.exists('select.form-control')).toEqual(true)
    })
})
