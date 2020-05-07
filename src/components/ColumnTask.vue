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
      <div class="flex flex-row flex-grow">
        <div class="flex flex-col flex-grow">
          <span class="w-full flex-no-shrink font-bold">
            {{ task.name }}
          </span>
          <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
            {{ task.description }}
          </p>
        </div>
        <div class="px-1">
          <AppIcon
            icon="trash"
            style="color:red"
            class="buttons"
            @click.stop="openDeleteModal({ columnIndex, taskIndex })"
          >
            Delete
          </AppIcon>
        </div>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    AppDrag,
    AppDrop
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
    },
    openDeleteModal (transferData) {
      this.$router.push({
        name: 'delete',
        params: {
          type: 'task',
          columnIndex: transferData.columnIndex,
          taskIndex: transferData.taskIndex
        }
      })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.buttons{
  text-align: right;
}
</style>
