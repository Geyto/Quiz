(function () {
    const Form = {
        agreeElement: null,
        processElement: null,
        fields: [{
            name: 'name', id: 'name', element: null, regex: /^[А-Я][а-я]+\s*$/, valid: false,
        }, {
            name: 'lastName', id: 'last-name', element: null, regex: /^[А-Я][а-я]+\s*$/, valid: false,
        }, {
            name: 'email',
            id: 'email',
            element: null,
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            valid: false,
        },], init() {
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            });
            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm()
            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        }, validateField(field, element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red';
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style');
                field.valid = true;

            }
            this.validateForm();
        }, validateForm() {
            const validForm = this.fields.every(item => item.valid);
            const isvalid = this.agreeElement.checked && validForm;
            if (isvalid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isvalid
        }, processForm() {
            if (this.validateForm()) {
                localStorage.setItem('nameUser', this.fields[0].element.value);
                localStorage.setItem('lastNameUser', this.fields[1].element.value);
                localStorage.setItem('mail', this.fields[2].element.value)
                location.href = 'choice.html';
            }
        }

    };
    Form.init();
})();