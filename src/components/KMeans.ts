export default class KMeans {
  constructor() {}

  // Функция для вычисления евклидова расстояния между двумя точками
  euclideanDistance(point1: number[], point2: number[]): number {
    return Math.sqrt(
      Math.pow(point1[0] - point2[0], 2) +
        Math.pow(point1[1] - point2[1], 2) +
        Math.pow(point1[2] - point2[2], 2)
    )
  }

  // Функция для нахождения ближайшего центроида к точке
  findClosestCentroid(point: number[], centroids: number[][]): number[] {
    let minDistance = Number.MAX_VALUE
    let closestCentroid: number[] | null = null

    centroids.forEach((centroid) => {
      let distance = this.euclideanDistance(point, centroid)
      if (distance < minDistance) {
        minDistance = distance
        closestCentroid = centroid
      }
    })

    return closestCentroid!
  }

  // Функция для обновления центроидов
  updateCentroids(clusters: number[][][]): number[][] {
    return clusters.map((cluster) => {
      if (cluster.length === 0) return [0, 0, 0]

      let sum = cluster.reduce(
        (acc, point) => {
          return [acc[0] + point[0], acc[1] + point[1], acc[2] + point[2]]
        },
        [0, 0, 0]
      )

      return [
        sum[0] / cluster.length,
        sum[1] / cluster.length,
        sum[2] / cluster.length,
      ]
    })
  }

  // Функция для кластеризации точек
  cluster(
    points: number[][],
    k: number,
    maxIterations: number = 100
  ): number[][][] {
    let centroids: number[][] = points.slice(0, k)
    let clusters: Array<number[][]> = new Array(k).fill(null).map(() => [])

    for (let i = 0; i < maxIterations; i++) {
      clusters = new Array(k).fill(null).map(() => [])

      points.forEach((point) => {
        let closestCentroid = this.findClosestCentroid(point, centroids)
        let centroidIndex = centroids.indexOf(closestCentroid)
        clusters[centroidIndex].push(point)
      })

      let newCentroids = this.updateCentroids(clusters)

      if (
        centroids.every(
          (centroid, index) =>
            this.euclideanDistance(centroid, newCentroids[index]) < 1
        )
      ) {
        break
      }

      centroids = newCentroids
    }

    return clusters
  }
}
