import Vue from 'vue'
Vue.use(require('vue-resource'))

import os from 'os'
import prettyBytes from 'pretty-bytes'

export default class Main extends Vue{
    constructor() {
        let properties =  {
            el: '#app',
            data: {
                statsOS: '',
                blog: ''
            },
            ready: function() {
                this.displayOSInfo()
                this.displayBlogInfo()
            },
            methods: {
                displayOSInfo: function() {
                    let infoCPU = `Number of CPU cores: ${os.cpus().length}`
                    let freeRAM = `Free memory: ${prettyBytes(os.freemem())}`

                    this.statsOS = { infoCPU, freeRAM }
                },

                displayBlogInfo: function() {
                    this.$http.get('http://api.tumblr.com/v2/blog/nayedkun.tumblr.com/posts?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4').
                        then(function(resp) {
                            //console.log(resp.data.response.posts)
                            this.$set('blog', resp.data.response.posts)
                        }, function(resp) {
                            console.log(`OUPS ${resp}`)
                        })

                    this.blog = {}
                }
            }
        }
        super(properties)
    }
}