<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
      <AppButton type="danger" @click.stop="deleteTask(columnIndex, taskIndex)">Delete</AppButton>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import AppButton from './AppButton'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    AppDrag,
    AppDrop,
    AppButton
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    deleteTask (columnIndex, taskIndex) {
      const column = this.board.columns[columnIndex].tasks
      this.$store.commit('DELETE_TASK', { column, taskIndex })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
