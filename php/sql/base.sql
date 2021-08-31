create table if not exists `associations`
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deal_id     VARCHAR(255) NOT NULL,
    card_id     VARCHAR(255) NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table if not exists `mappings`
(
    id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    board_id            VARCHAR(255) NOT NULL,
    board_list_id       VARCHAR(255) NOT NULL,
    pipeline_id         VARCHAR(255) NOT NULL,
    pipeline_stage_id   VARCHAR(255) NOT NULL,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `mappings` ADD UNIQUE KEY board_id_pipeline_id_board_list_id (board_id, pipeline_id, board_list_id);

ALTER TABLE `mappings` ADD UNIQUE KEY board_id_pipeline_id_pipeline_stage_id (board_id, pipeline_id, pipeline_stage_id);

create table if not exists `settings`
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(250) NOT NULL,
    data        text NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name)
);
create table if not exists card_webhooks
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    webhook_id  VARCHAR(255) NOT NULL,
    card_id     VARCHAR(255) NOT NULL,
    UNIQUE (card_id)
);
