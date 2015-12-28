import Vue from 'vue'
import os from 'os'
import prettyBytes from 'pretty-bytes'

export default class Main extends Vue{
    constructor() {
        let properties =  {
            el: '#app',
            data: {
                statsOS: ''
            },
            ready: function() {
                this.displayOSInfo()
            },
            methods: {
                displayOSInfo: function() {
                    let infoCPU = `Number of CPU cores: ${os.cpus().length}`
                    let freeRAM = `Free memory: ${prettyBytes(os.freemem())}`

                    this.statsOS = {infoCPU, freeRAM}
                }
            }
        }
        super(properties)
    }
}