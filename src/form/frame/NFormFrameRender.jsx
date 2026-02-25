
export default class NFormFrameRender {

    constructor(vm) {
        this.vm = vm;
    }

    renderDefault() {
        const vm = this.vm;
        console.log(vm);

        return (
            <div className={['foobar']}>
                <div>
                    hallo {vm.data.count.value} <button onClick={vm.addCount}>add</button>
                </div>
                <div>
                    prop {vm.props.kind}
                </div>
            </div>
        )
    }
}