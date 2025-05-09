

### 什么是RAG?

🛠️ RAG的核心流程

检索（Retrieval）：
从海量文档、数据库或互联网中快速查找与问题相关的信息（比如搜论文、找说明书）。

增强（Augmentation）：
把检索到的内容“喂”给AI模型，让它结合这些资料理解问题。

生成（Generation）：
基于检索到的信息和自身知识库，生成最终答案（并标注来源）。


#### 检索召回？
检索召回（Retrieval）是 RAG（Retrieval-Augmented Generation）系统中的关键步骤，指的是从大量文档中找出与用户查询相关的文档片段的过程。k