<template>
    <div>
        <p class="label">{{ name }}</p>
        
        <div class="subrules" v-if="subrules">
            <PolicyTreeRuleItem
                v-for="(subrule, index) in subrules"
                :key="index"
                :policy="policy"
                :path="[...path, subruleType, index]"
            />
        </div>

    </div>
</template>

<script>
import { RuleTypes } from '../../libs/rules/rules';

export default {
    name: 'PolicyTreeRuleItem',
    props: {
        policy: {
            type: Object,
            required: true,
        },
        path: {
            type: Array,
            required: true,
        }
    },
    computed: {
        rule() {
            return this.path.reduce((result, segment) => result[segment], this.policy);
        },
        name() {
            let pathLen = this.path.length;
            let rType = RuleTypes[this.path[pathLen - 2]];
            return rType.name;
        },
        subruleType() {
            let pathLen = this.path.length;
            let rType = RuleTypes[this.path[pathLen - 2]];
            return rType.subrule;
        },
        subrules() {
            return this.rule[this.subruleType];
        }
    },
}
</script>

<style scoped>
.label {
    margin: 4px 0px;
}
.subrules {
    padding-left: 20px;
}
</style>
